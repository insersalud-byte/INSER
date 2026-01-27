import React, { useEffect, useState } from 'react';
import { supabase } from '../../../services/supabase';
import { useAuth } from '../../auth/AuthContext';
import css from './Banners.module.css';

const Banners = () => {
    const { user } = useAuth();
    const [banners, setBanners] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBanners();
    }, [user]);

    useEffect(() => {
        // Track view when banner changes
        if (banners.length > 0 && banners[currentIndex]) {
            trackView(banners[currentIndex].id);
        }
    }, [currentIndex, banners]);

    useEffect(() => {
        // Auto-rotate banners every 5 seconds
        if (banners.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % banners.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [banners.length]);

    const loadBanners = async () => {
        try {
            // Get user's treatments for segmentation
            const { data: treatments } = await supabase
                .from('treatments')
                .select('*')
                .eq('user_id', user.id)
                .single();

            // Get user's setup for detailed segmentation
            const { data: apnea } = await supabase
                .from('apnea_setup')
                .select('mask_type, acquired_as')
                .eq('user_id', user.id)
                .single();

            const { data: oxygen } = await supabase
                .from('oxygen_setup')
                .select('equipment_type, acquired_as')
                .eq('user_id', user.id)
                .single();

            // Load active banners
            const { data: allBanners, error } = await supabase
                .from('promotions')
                .select('*')
                .eq('active', true)
                .gte('end_date', new Date().toISOString())
                .lte('start_date', new Date().toISOString())
                .order('priority', { ascending: false });

            if (error) throw error;

            // Filter banners based on segmentation
            const filteredBanners = (allBanners || []).filter(banner => {
                // If target_all, show to everyone
                if (banner.target_all) return true;

                // Check treatment targeting
                if (banner.target_apnea && !treatments?.has_apnea) return false;
                if (banner.target_oxygen && !treatments?.has_oxygen) return false;
                if (banner.target_rehab && !treatments?.has_rehab) return false;

                // Check acquisition type
                if (banner.target_alquiler && apnea?.acquired_as !== 'ALQUILER' && oxygen?.acquired_as !== 'ALQUILER') return false;
                if (banner.target_compra && apnea?.acquired_as !== 'COMPRA' && oxygen?.acquired_as !== 'COMPRA') return false;

                // Check specific equipment
                if (banner.target_mask_type && apnea?.mask_type !== banner.target_mask_type) return false;
                if (banner.target_oxygen_equipment && oxygen?.equipment_type !== banner.target_oxygen_equipment) return false;

                return true;
            });

            setBanners(filteredBanners.slice(0, 5)); // Max 5 banners
        } catch (err) {
            console.error('Error loading banners:', err);
        } finally {
            setLoading(false);
        }
    };

    const trackView = async (promotionId) => {
        try {
            await supabase
                .from('promotion_stats')
                .insert({
                    promotion_id: promotionId,
                    user_id: user.id,
                    event_type: 'VIEW'
                });
        } catch (err) {
            console.error('Error tracking view:', err);
        }
    };

    const trackClick = async (promotionId) => {
        try {
            await supabase
                .from('promotion_stats')
                .insert({
                    promotion_id: promotionId,
                    user_id: user.id,
                    event_type: 'CLICK'
                });
        } catch (err) {
            console.error('Error tracking click:', err);
        }
    };

    const handleBannerClick = (banner) => {
        trackClick(banner.id);

        if (banner.cta_type === 'STORE' || banner.cta_type === 'WHATSAPP') {
            window.open(banner.cta_url, '_blank');
        } else if (banner.cta_type === 'INTERNAL') {
            window.location.hash = banner.cta_url;
        }
    };

    if (loading || banners.length === 0) {
        return null;
    }

    const currentBanner = banners[currentIndex];

    return (
        <div className={css.bannerContainer}>
            <div
                className={css.banner}
                onClick={() => currentBanner.cta_type !== 'NONE' && handleBannerClick(currentBanner)}
                style={{
                    backgroundImage: currentBanner.image_url ? `url(${currentBanner.image_url})` : 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                    cursor: currentBanner.cta_type !== 'NONE' ? 'pointer' : 'default'
                }}
            >
                <div className={css.bannerContent}>
                    <h3>{currentBanner.title}</h3>
                    {currentBanner.subtitle && <p>{currentBanner.subtitle}</p>}
                    {currentBanner.cta_type !== 'NONE' && (
                        <span className={css.ctaLabel}>
                            {currentBanner.cta_type === 'STORE' && 'Ver en tienda →'}
                            {currentBanner.cta_type === 'WHATSAPP' && 'Contactar →'}
                            {currentBanner.cta_type === 'INTERNAL' && 'Ver más →'}
                        </span>
                    )}
                </div>
            </div>

            {banners.length > 1 && (
                <div className={css.dots}>
                    {banners.map((_, idx) => (
                        <button
                            key={idx}
                            className={`${css.dot} ${idx === currentIndex ? css.active : ''}`}
                            onClick={() => setCurrentIndex(idx)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Banners;

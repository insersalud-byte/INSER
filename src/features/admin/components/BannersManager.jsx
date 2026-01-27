import React, { useEffect, useState } from 'react';
import { supabase } from '../../../services/supabase';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import css from '../AdminPanel.module.css';

const BannersManager = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newBanner, setNewBanner] = useState({ title: '', image_url: '', link_url: '', priority: 0 });

    const fetchBanners = async () => {
        const { data, error } = await supabase
            .from('promotions')
            .select('*')
            .order('priority', { ascending: false });
        if (data) setBanners(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    const toggleActive = async (id, current) => {
        const { error } = await supabase.from('promotions').update({ active: !current }).eq('id', id);
        if (!error) fetchBanners();
    };

    const deleteBanner = async (id) => {
        if (!confirm('¿Eliminar banner?')) return;
        const { error } = await supabase.from('promotions').delete().eq('id', id);
        if (!error) fetchBanners();
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        const { error } = await supabase.from('promotions').insert([{ ...newBanner, active: true }]);
        if (!error) {
            setNewBanner({ title: '', image_url: '', link_url: '', priority: 0 });
            fetchBanners();
        } else {
            alert('Error creando banner');
        }
    };

    return (
        <div>
            <h2>Gestión de Banners</h2>

            {/* Create Form */}
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
                <h3>Nuevo Banner</h3>
                <form onSubmit={handleCreate} style={{ display: 'grid', gap: '1rem', maxWidth: '500px' }}>
                    <Input label="Título" value={newBanner.title} onChange={e => setNewBanner({ ...newBanner, title: e.target.value })} required />
                    <Input label="URL Imagen" value={newBanner.image_url} onChange={e => setNewBanner({ ...newBanner, image_url: e.target.value })} required />
                    <Input label="Link al clickear (opcional)" value={newBanner.link_url} onChange={e => setNewBanner({ ...newBanner, link_url: e.target.value })} />
                    <Input label="Prioridad (número)" type="number" value={newBanner.priority} onChange={e => setNewBanner({ ...newBanner, priority: e.target.value })} />
                    <Button type="submit">Crear Publicidad</Button>
                </form>
            </div>

            {/* List */}
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {banners.map(b => (
                    <div key={b.id} style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <div style={{ height: '120px', background: `url(${b.image_url}) center/cover` }} />
                        <div style={{ padding: '1rem' }}>
                            <h4 style={{ margin: '0 0 0.5rem' }}>{b.title}</h4>
                            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Prioridad: {b.priority}</p>
                            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Estado: {b.active ? 'Activo' : 'Inactivo'}</p>

                            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                                <Button size="sm" variant={b.active ? 'secondary' : 'primary'} onClick={() => toggleActive(b.id, b.active)}>
                                    {b.active ? 'Pausar' : 'Activar'}
                                </Button>
                                <Button size="sm" variant="danger" onClick={() => deleteBanner(b.id)}>Eliminar</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BannersManager;

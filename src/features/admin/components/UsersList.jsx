import React, { useEffect, useState } from 'react';
import { supabase } from '../../../services/supabase';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import css from '../AdminPanel.module.css';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const fetchUsers = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching users:', error);
        else setUsers(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filtered = users.filter(u =>
        u.email?.toLowerCase().includes(search.toLowerCase()) ||
        u.full_name?.toLowerCase().includes(search.toLowerCase())
    );

    const exportCSV = () => {
        const headers = ["ID", "Email", "Name", "Phone", "City", "Obra Social", "Medico", "Marketing"];
        const rows = filtered.map(u => [
            u.id, u.email, u.full_name, u.phone, u.city, u.health_insurance, u.referring_doctor, u.marketing_opt_in ? "Yes" : "No"
        ]);
        const csvContent = "data:text/csv;charset=utf-8,"
            + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "pacientes_inser_salud.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h2>Listado de Pacientes ({filtered.length})</h2>
                <Button size="sm" onClick={exportCSV}>Exportar CSV</Button>
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <Input
                    placeholder="Buscar por nombre, email, médico u obra social..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            {loading ? <p>Cargando...</p> : (
                <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                            <tr>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Nombre / Teléfono</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Obra Social</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Médico</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Habilitado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(u => (
                                <tr key={u.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontWeight: 'bold' }}>{u.full_name || 'Sin nombre'}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{u.phone || u.email}</div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>{u.health_insurance || '-'}</td>
                                    <td style={{ padding: '1rem' }}>{u.referring_doctor || '-'}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span dangerouslySetInnerHTML={{ __html: u.onboarding_completed ? '✅ <small>Ready</small>' : '⏳ <small>Pending</small>' }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UsersList;

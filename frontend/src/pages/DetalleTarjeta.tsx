import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tokens } from '../styles/tokens';
import { useCards } from '../hooks/useCards';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import TextField from '../components/ui/TextField';
import TextArea from '../components/ui/TextArea';
import Select from '../components/ui/Select';
import Loader from '../components/shared/Loader';
import Modal from '../components/ui/Modal';

export default function DetalleTarjeta() {
  const { cardId } = useParams<{ cardId: string }>();
  const navigate = useNavigate();
  const { currentCard, fetchCards, updateCard, deleteCard } = useCards();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (cardId) {
      fetchCards('default').then(() => setLoading(false));
    }
  }, [cardId]);

  const handleSave = async () => {
    if (!cardId) return;
    await updateCard(cardId, { title, description, status: status as any });
  };

  const handleDelete = async () => {
    if (!cardId) return;
    await deleteCard(cardId);
    navigate('/');
  };

  if (loading) return <Loader />;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: tokens.colors.background, padding: tokens.spacing.lg }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacing.lg }}>
          <h1 style={{ margin: 0, fontSize: tokens.typography.headings.h1.size, fontWeight: 600, color: tokens.colors.text_primary }}>Card Details</h1>
          <Button variant="secondary" onClick={() => navigate('/')}>Back to Board</Button>
        </div>
        <div style={{ backgroundColor: tokens.colors.surface, padding: tokens.spacing.lg, borderRadius: tokens.radii.lg, boxShadow: tokens.shadows.card }}>
          <TextField label="Title" value={title} onChange={setTitle} placeholder="Card title" />
          <TextArea label="Description" value={description} onChange={setDescription} placeholder="Card description" rows={6} />
          <Select
            label="Status"
            value={status}
            onChange={setStatus}
            options={[
              { value: 'idea', label: 'Idea' },
              { value: 'en_redaccion', label: 'En Redacción' },
              { value: 'en_revision', label: 'En Revisión' },
              { value: 'aprobado', label: 'Aprobado' },
              { value: 'publicado', label: 'Publicado' },
              { value: 'bloqueado', label: 'Bloqueado' },
            ]}
          />
          <div style={{ display: 'flex', gap: tokens.spacing.md, justifyContent: 'flex-end', marginTop: tokens.spacing.lg }}>
            <Button variant="secondary" onClick={() => setShowDeleteModal(true)}>Delete</Button>
            <Button variant="primary" onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </div>
      <Modal open={showDeleteModal} title="Delete Card" onClose={() => setShowDeleteModal(false)} actions={<><Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button><Button variant="primary" onClick={handleDelete}>Delete</Button></>}>
        <p>Are you sure you want to delete this card? This action cannot be undone.</p>
      </Modal>
    </div>
  );
}
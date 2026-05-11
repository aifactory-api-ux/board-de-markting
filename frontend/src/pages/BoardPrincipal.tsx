import { useEffect, useState } from 'react';
import { tokens } from '../styles/tokens';
import { useAuth } from '../hooks/useAuth';
import { useBoard } from '../hooks/useBoard';
import { useKanban } from '../hooks/useKanban';
import { useCards } from '../hooks/useCards';
import { useNotifications } from '../hooks/useNotifications';
import TopNavBar from '../components/ui/TopNavBar';
import KanbanColumn from '../components/ui/KanbanColumn';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import TextField from '../components/ui/TextField';
import TextArea from '../components/ui/TextArea';
import Loader from '../components/shared/Loader';
import { ContentCard } from '../components/ui/ContentCard';

export default function BoardPrincipal() {
  const { user, logout } = useAuth();
  const { boards, currentBoard, fetchBoards, selectBoard, createBoard } = useBoard();
  const { columns, fetchColumns, addColumn } = useKanban();
  const { cards, fetchCards, createCard } = useCards();
  const { notifications, fetchNotifications, markRead } = useNotifications();
  const [showNewBoardModal, setShowNewBoardModal] = useState(false);
  const [showNewCardModal, setShowNewCardModal] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardDesc, setNewBoardDesc] = useState('');
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDesc, setNewCardDesc] = useState('');
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await fetchBoards();
      await fetchNotifications();
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    if (currentBoard) {
      fetchColumns(currentBoard.id);
      fetchCards(currentBoard.id);
    }
  }, [currentBoard]);

  const handleCreateBoard = async () => {
    if (!newBoardName.trim()) return;
    await createBoard({ name: newBoardName, description: newBoardDesc });
    setShowNewBoardModal(false);
    setNewBoardName('');
    setNewBoardDesc('');
  };

  const handleCreateCard = async () => {
    if (!newCardTitle.trim() || !selectedColumnId || !currentBoard) return;
    await createCard(currentBoard.id, {
      title: newCardTitle,
      description: newCardDesc,
      columnId: selectedColumnId,
    });
    setShowNewCardModal(false);
    setNewCardTitle('');
    setNewCardDesc('');
    setSelectedColumnId(null);
  };

  const handleNotificationClick = async (id: string) => {
    await markRead([id]);
  };

  if (loading) return <Loader />;
  if (!user) return null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: tokens.colors.background }}>
      <TopNavBar user={user} onLogout={logout} onSearch={() => {}} notifications={notifications} onNotificationClick={handleNotificationClick} />
      <div style={{ padding: tokens.spacing.lg }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacing.lg }}>
          <h1 style={{ margin: 0, fontSize: tokens.typography.headings.h1.size, fontWeight: 600, color: tokens.colors.text_primary }}>Boards</h1>
          <Button variant="primary" onClick={() => setShowNewBoardModal(true)}>+ New Board</Button>
        </div>
        <div style={{ display: 'flex', gap: tokens.spacing.md, overflowX: 'auto' }}>
          {boards.map((board) => (
            <div
              key={board.id}
              onClick={() => selectBoard(board)}
              style={{
                minWidth: 200,
                padding: tokens.spacing.md,
                backgroundColor: currentBoard?.id === board.id ? tokens.colors.primary + '20' : tokens.colors.surface,
                borderRadius: tokens.radii.md,
                cursor: 'pointer',
                border: currentBoard?.id === board.id ? `2px solid ${tokens.colors.primary}` : `1px solid ${tokens.colors.border}`,
              }}
            >
              <h3 style={{ margin: 0, fontSize: tokens.typography.body.size, fontWeight: 600, color: tokens.colors.text_primary }}>{board.name}</h3>
              <p style={{ margin: `${tokens.spacing.xs} 0 0`, fontSize: tokens.typography.small.size, color: tokens.colors.text_secondary }}>{board.description}</p>
            </div>
          ))}
        </div>
        {currentBoard && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: tokens.spacing.xl, marginBottom: tokens.spacing.md }}>
              <h2 style={{ margin: 0, fontSize: tokens.typography.headings.h2.size, fontWeight: 600, color: tokens.colors.text_primary }}>{currentBoard.name}</h2>
              <Button variant="secondary" onClick={() => {}}>+ Add Column</Button>
            </div>
            <div style={{ display: 'flex', gap: tokens.spacing.md, overflowX: 'auto' }}>
              {columns.map((column) => (
                <KanbanColumn
                  key={column.id}
                  column={column}
                  cards={cards.filter((c) => c.columnId === column.id)}
                  onCardDrop={() => {}}
                  onAddCard={() => {
                    setSelectedColumnId(column.id);
                    setShowNewCardModal(true);
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <Modal open={showNewBoardModal} title="Create New Board" onClose={() => setShowNewBoardModal(false)} actions={<><Button variant="secondary" onClick={() => setShowNewBoardModal(false)}>Cancel</Button><Button variant="primary" onClick={handleCreateBoard}>Create</Button></>}>
        <TextField label="Board Name" value={newBoardName} onChange={setNewBoardName} placeholder="Enter board name" />
        <TextArea label="Description" value={newBoardDesc} onChange={setNewBoardDesc} placeholder="Enter board description" />
      </Modal>
      <Modal open={showNewCardModal} title="Create New Card" onClose={() => setShowNewCardModal(false)} actions={<><Button variant="secondary" onClick={() => setShowNewCardModal(false)}>Cancel</Button><Button variant="primary" onClick={handleCreateCard}>Create</Button></>}>
        <TextField label="Card Title" value={newCardTitle} onChange={setNewCardTitle} placeholder="Enter card title" />
        <TextArea label="Description" value={newCardDesc} onChange={setNewCardDesc} placeholder="Enter card description" />
      </Modal>
    </div>
  );
}
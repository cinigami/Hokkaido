import React, { useState } from 'react';
import { Check, Plus, Trash2, Edit3, X } from 'lucide-react';

const FoodChecklist = ({ foods, onUpdateFoods }) => {
  const [newFood, setNewFood] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editNotes, setEditNotes] = useState('');

  const handleAddFood = () => {
    if (!newFood.trim()) return;

    const newItem = {
      id: Date.now(),
      name: newFood.trim(),
      notes: newNotes.trim(),
      checked: false
    };

    onUpdateFoods([...foods, newItem]);
    setNewFood('');
    setNewNotes('');
  };

  const handleToggleCheck = (id) => {
    onUpdateFoods(foods.map(food =>
      food.id === id ? { ...food, checked: !food.checked } : food
    ));
  };

  const handleDelete = (id) => {
    onUpdateFoods(foods.filter(food => food.id !== id));
  };

  const handleStartEdit = (food) => {
    setEditingId(food.id);
    setEditText(food.name);
    setEditNotes(food.notes || '');
  };

  const handleSaveEdit = () => {
    if (!editText.trim()) return;

    onUpdateFoods(foods.map(food =>
      food.id === editingId
        ? { ...food, name: editText.trim(), notes: editNotes.trim() }
        : food
    ));
    setEditingId(null);
    setEditText('');
    setEditNotes('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
    setEditNotes('');
  };

  const uncheckedFoods = foods.filter(f => !f.checked);
  const checkedFoods = foods.filter(f => f.checked);

  return (
    <div className="space-y-4">
      {/* Add new food */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Food to Try
        </h3>
        <div className="space-y-2">
          <input
            type="text"
            value={newFood}
            onChange={(e) => setNewFood(e.target.value)}
            placeholder="Food name (e.g., Miso Ramen)"
            className="w-full px-3 py-2 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 text-sm"
            onKeyDown={(e) => e.key === 'Enter' && handleAddFood()}
          />
          <input
            type="text"
            value={newNotes}
            onChange={(e) => setNewNotes(e.target.value)}
            placeholder="Notes (optional - e.g., at Nijo Market)"
            className="w-full px-3 py-2 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 text-sm"
            onKeyDown={(e) => e.key === 'Enter' && handleAddFood()}
          />
          <button
            onClick={handleAddFood}
            disabled={!newFood.trim()}
            className="w-full px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to List
          </button>
        </div>
      </div>

      {/* Unchecked items */}
      {uncheckedFoods.length > 0 && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <h3 className="text-white font-semibold mb-3">To Try ({uncheckedFoods.length})</h3>
          <div className="space-y-2">
            {uncheckedFoods.map((food) => (
              <FoodItem
                key={food.id}
                food={food}
                isEditing={editingId === food.id}
                editText={editText}
                editNotes={editNotes}
                onToggleCheck={handleToggleCheck}
                onDelete={handleDelete}
                onStartEdit={handleStartEdit}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={handleCancelEdit}
                setEditText={setEditText}
                setEditNotes={setEditNotes}
              />
            ))}
          </div>
        </div>
      )}

      {/* Checked items */}
      {checkedFoods.length > 0 && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <h3 className="text-white/70 font-semibold mb-3">Tasted! ({checkedFoods.length})</h3>
          <div className="space-y-2">
            {checkedFoods.map((food) => (
              <FoodItem
                key={food.id}
                food={food}
                isEditing={editingId === food.id}
                editText={editText}
                editNotes={editNotes}
                onToggleCheck={handleToggleCheck}
                onDelete={handleDelete}
                onStartEdit={handleStartEdit}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={handleCancelEdit}
                setEditText={setEditText}
                setEditNotes={setEditNotes}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {foods.length === 0 && (
        <div className="text-center py-8 text-white/60">
          <p>No foods added yet.</p>
          <p className="text-sm mt-1">Add some Hokkaido delicacies to try!</p>
        </div>
      )}
    </div>
  );
};

const FoodItem = ({
  food,
  isEditing,
  editText,
  editNotes,
  onToggleCheck,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  setEditText,
  setEditNotes
}) => {
  if (isEditing) {
    return (
      <div className="bg-white/20 rounded-lg p-3 space-y-2">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-white/90 text-gray-800 text-sm"
          autoFocus
        />
        <input
          type="text"
          value={editNotes}
          onChange={(e) => setEditNotes(e.target.value)}
          placeholder="Notes (optional)"
          className="w-full px-3 py-2 rounded-lg bg-white/90 text-gray-800 text-sm"
        />
        <div className="flex gap-2">
          <button
            onClick={onSaveEdit}
            className="flex-1 px-3 py-1.5 rounded-lg bg-green-500 text-white text-sm font-medium"
          >
            Save
          </button>
          <button
            onClick={onCancelEdit}
            className="px-3 py-1.5 rounded-lg bg-white/20 text-white text-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
        food.checked
          ? 'bg-green-500/20 border border-green-400/30'
          : 'bg-white/5 hover:bg-white/10'
      }`}
    >
      <button
        onClick={() => onToggleCheck(food.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
          food.checked
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-white/40 hover:border-white/60'
        }`}
      >
        {food.checked && <Check className="w-4 h-4" />}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`text-white font-medium ${food.checked ? 'line-through opacity-70' : ''}`}>
          {food.name}
        </p>
        {food.notes && (
          <p className={`text-sm mt-0.5 ${food.checked ? 'text-white/40' : 'text-white/60'}`}>
            {food.notes}
          </p>
        )}
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onStartEdit(food)}
          className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(food.id)}
          className="p-1.5 rounded-lg text-white/50 hover:text-red-400 hover:bg-white/10 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default FoodChecklist;

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let items = [
    { id: 1, name: 'Nagakiba', type: 'Katana', damage: '127 + 111' },
    { id: 2, name: 'Rivers Of Blood', type: 'Katana', damage: '132 + 102' }
];

let nextId = 3;

function validateItem(body) {
    const { name, type, damage } = body || {};
    return (
        typeof name === 'string' && name.trim() &&
        typeof type === 'string' && type.trim() &&
        typeof damage === 'string' && damage.trim()
    );
}

const INVALID_MESSAGE = 'Name, type, and damage are required and must be non-empty strings.';

app.get('/', (req, res) => {
    res.json({ message: 'Items API is running!' });
});

app.get('/api/items', (req, res) => {
    res.status(200).json(items);
});

app.get('/api/items/:id', (req, res) => {
    const id = Number(req.params.id);
    const item = items.find(i => i.id === id);

    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(item);
});

app.post('/api/items', (req, res) => {
    if (!validateItem(req.body)) {
        return res.status(400).json({ message: INVALID_MESSAGE });
    }

    const { name, type, damage } = req.body;

    const newItem = {
        id: nextId++,
        name: name.trim(),
        type: type.trim(),
        damage: damage.trim()
    };

    items.push(newItem);

    res.status(201).json({
        message: 'Item created successfully',
        item: newItem
    });
});

app.put('/api/items/:id', (req, res) => {
    const id = Number(req.params.id);
    const item = items.find(i => i.id === id);

    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }

    if (!validateItem(req.body)) {
        return res.status(400).json({ message: INVALID_MESSAGE });
    }

    const { name, type, damage } = req.body;

    item.name = name.trim();
    item.type = type.trim();
    item.damage = damage.trim();

    res.status(200).json({
        message: 'Item updated successfully',
        item
    });
});

app.delete('/api/items/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = items.findIndex(i => i.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }

    const deletedItem = items.splice(index, 1)[0];

    res.status(200).json({
        message: 'Item deleted successfully',
        item: deletedItem
    });
});

// Malformed JSON body handler
app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ message: 'Invalid JSON body' });
    }
    next(err);
});

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

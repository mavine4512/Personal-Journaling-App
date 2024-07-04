// const { Journal } = require('../models');

// exports.createJournal = async (req, res) => {
//     const { title, content, category } = req.body;
//     const userId = req.user.id;

//   try {
//      const journal = await Journal.create({ title, content, category, userId });
//         res.status(201).json({ journal });
//   } catch (err) {
//     res.status(400).json({ message: 'Error creating entry', error: err.message });
//   }
// };


const Journal = require('../models/Journal');

// Get all journal entries
exports.getAllJournals = async (req, res) => {
    try {
        const journals = await Journal.findAll();
        res.json(journals);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching journals.' });
    }
};

// Get a single journal entry by ID
exports.getJournalById = async (req, res) => {
    try {
        const journal = await Journal.findByPk(req.params.id);
        if (!journal) {
            return res.status(404).json({ error: 'Journal entry not found.' });
        }
        res.json(journal);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the journal.' });
    }
};

// Create a new journal entry
exports.createJournal = async (req, res) => {
    try {
        const journal = await Journal.create(req.body);
        res.status(201).json(journal);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the journal.' });
    }
};

// Update a journal entry by ID
exports.updateJournal = async (req, res) => {
    try {
        const journal = await Journal.findByPk(req.params.id);
        if (!journal) {
            return res.status(404).json({ error: 'Journal entry not found.' });
        }
        await journal.update(req.body);
        res.json(journal);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the journal.' });
    }
};

// Delete a journal entry by ID
exports.deleteJournal = async (req, res) => {
    try {
        const journal = await Journal.findByPk(req.params.id);
        if (!journal) {
            return res.status(404).json({ error: 'Journal entry not found.' });
        }
        await journal.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the journal.' });
    }
};

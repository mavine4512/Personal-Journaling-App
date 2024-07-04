// const express = require('express');
// const { createJournal, getJournals, updateJournal, deleteJournal } = require('../controllers/journalController');
// const authenticate = require('../middleware/authMiddleware');

// const router = express.Router();

// router.use(authenticate);

// // Create a new journal entry
// router.post('/', createJournal);

// // Get all journal entries
// router.get('/', getJournals);

// // Update a journal entry by ID
// router.put('/:id', updateJournal);

// // Delete a journal entry by ID
// router.delete('/:id', deleteJournal);

// module.exports = router;

const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');

// Get all journal entries
router.get('/', journalController.getAllJournals);

// Get a single journal entry by ID
router.get('/:id', journalController.getJournalById);

// Create a new journal entry
router.post('/', journalController.createJournal);

// Update a journal entry by ID
router.put('/:id', journalController.updateJournal);

// Delete a journal entry by ID
router.delete('/:id', journalController.deleteJournal);

module.exports = router;


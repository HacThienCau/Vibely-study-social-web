const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const {
    createGoal,
    getGoals,
    updateGoal,
    deleteGoal,
    toggleGoalCompletion,
    toggleGoalVisibility
} = require('../controllers/learningGoalController');

router.use(auth);

router.post('/', createGoal);
router.get('/', getGoals);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);
router.patch('/:id/toggle', toggleGoalCompletion);  // Toggle trạng thái hoàn thành
router.patch('/:id/visibility', toggleGoalVisibility);

module.exports = router; 
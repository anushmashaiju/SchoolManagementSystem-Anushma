import { Router } from 'express';
import {
    getFeesHistory,
    addFeesHistory,
    updateFeesHistory,
    deleteFeesHistory,
    getAllFeesHistory,
} from '../controllers/feesController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const feeRouter = Router();

// Route to get fees history for a student 
feeRouter.get('/fees/student/:studentId', verifyToken, getFeesHistory);

// Get all students' fees history 
feeRouter.get('/fees/all', verifyToken, getAllFeesHistory);

// Route to add new fees record 
feeRouter.post('/fees', verifyToken, addFeesHistory);

// Route to update fees record 
feeRouter.put('/fees/:id', verifyToken, updateFeesHistory);

// Route to delete fees record 
feeRouter.delete('/fees/:id', verifyToken, deleteFeesHistory);

export default feeRouter;

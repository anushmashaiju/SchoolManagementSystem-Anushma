import { Router } from 'express';
import {
    addLibraryHistory,
    getLibraryHistory,
    getAllLibraryHistory,
    updateLibraryHistory,
    deleteLibraryHistory
} from '../controllers/libraryController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const libraryRouter = Router();

// Route to add a new library history record 
libraryRouter.post('/library', verifyToken, addLibraryHistory);

// Route to get library history for a specific student (can be public or protected)
libraryRouter.get('/library/student/:studentId', verifyToken, getLibraryHistory);

// Route to get all library history 
libraryRouter.get('/library/all', verifyToken, getAllLibraryHistory);

// Route to update a library history record 
libraryRouter.put('/library/:id', verifyToken, updateLibraryHistory);

// Route to delete a library history record 
libraryRouter.delete('/library/:id', verifyToken, deleteLibraryHistory);

export default libraryRouter;

import express from 'express';
import { addBookmark, getBookmarks , removeBookmark , hasBookmarked} from '../controllers/bookmark.controller';
import e from 'express';

const router = express.Router();

router.post('/add-bookmark', addBookmark);
router.get('/get-bookmarks', getBookmarks);
router.post('/remove-bookmark', removeBookmark);
router.get('/has-bookmarked', hasBookmarked);

export default router;
const express = require("express")
const { Protect } = require("../middleware/authMiddleware")
const { getDocuments, getDocument, createDocument, updateDocument, deleteDocument } = require("../controller/documentController")
const multer = require("multer")

const router = express.Router()



router.get("/", Protect, getDocuments)

router.get("/:id", Protect, getDocument)


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Folder where uploaded photos will be stored
  },
  profileimage: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single('profileimage'), Protect, createDocument)


router.put("/:id", Protect, updateDocument)

router.delete("/:id", Protect, deleteDocument)


module.exports = router
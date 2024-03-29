import { Router } from "express";
import { mkdirSync } from "fs";
import multer from "multer";
import { authenticateRequest } from "../../../../middlewares/passport.middleware";
import { createEvent, listAllEvents } from "../controllers/events.controller";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directory = "uploads/";
    mkdirSync(directory, { recursive: true });
    cb(null, directory);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const evetnRouter = Router();

evetnRouter.get("/", authenticateRequest, listAllEvents);
evetnRouter.post(
  "/create",
  [authenticateRequest, upload.single("poster")],
  createEvent
);

export default evetnRouter;

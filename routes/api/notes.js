const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Note = require('../../models/Note');
const validateNoteInput = require('../../validation/coffee_note');

const keysFromReq = (req) => {
  return {
    userId: req.body.userId,
    notes: req.body.notes,
    brewMethod: req.body.brewMethod,
    ratio: req.body.ratio,
    time: req.body.time,
    beanId: req.body.beanId 
  }
}

const decomposePayload = (note) => {
  return {
    id: note._id,
    userId: note.userId,
    notes: note.notes,
    brewMethod: note.brewMethod,
    ratio: note.ratio,
    time: note.time, 
    beanId: req.body.beanId,
  }
}

//post new note
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateNoteInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newNote = new Note(keysFromReq(req));
    newNote.save()
      .then((note) => res.json(note));
  }
);

//get user's notes
router.get(
  '/user/:user_id', 
  (req, res) => {
    Note.find({userId: req.params.user_id})
      .then(notes => res.json(notes))
      .catch(err => res.status(404).json(err));
  }
);

//get notes by bean id
router.get(
  '/bean/:bean_id',
  (req,res) => {
    Note.find({beanId: req.params.bean_id})
      .then(notes => res.json(notes))
      .catch(err => res.status(404).json(err));
  }
);

//get note by id
router.get(
  '/:id', 
  (req, res) => {
    Note.findById(req.params.id)
      .then(note => res.json(note))
      .catch(err => res.status(404).json(err));
  }
);

//get most recent note by bean id
router.get(
  '/recent/:bean_id',
  (req,res) => {
    Note.find({beanId: req.params.bean_id})
    .sort({ updatedAt: 'desc'})
    .then(notes => {
      res.json(notes[0]);
    })
    .catch(err => res.status(404).json(err));
  }
);

//update note
router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const filter = { _id: req.body.id };
    const update = keysFromReq(req);
    Note.findOneAndUpdate(filter, update, { new: true })
      .then(note => res.json(note))
      .catch(err => res.status(422).json(err));
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Note.findByIdAndDelete(req.params.id)
      .then(() => res.status(200).json("Note deleted"))
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
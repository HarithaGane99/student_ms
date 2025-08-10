const express = require("express");
const router = express.Router();
let Student = require("../models/Student");
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

// router.route("/add").post((req,res)=>{
//     const name=req.body.name;
//     const age=Number(req.body.age);
//     const gender=req.body.gender;
//     const email=req.body.email;

//     const newStudent = new Student({
//         name,
//         age,
//         gender,
//         email
//     })

//     newStudent.save().then(()=>{
//         res.json("Student Added");
//     }).catch((err)=>{
//         console.log(err);
//     })
// })



router.get("/", auth, (req, res) => {
    Student.find()
        .select("-password") // Exclude password from the result
        .then(students => res.json(students))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.put("/update/:id", [auth, authorize(['admin'])], async (req, res) => {
    try {
        const studentId = req.params.id;
        const { name, age, gender, email } = req.body;

        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            { name, age: Number(age), gender, email },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json("Student not found");
        }
        res.json("Student Updated");
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});



router.delete("/delete/:id", [auth, authorize(['admin'])], async (req, res) => {
    try {
        const studentId = req.params.id;
        const deletedStudent = await Student.findByIdAndDelete(studentId);

        if (!deletedStudent) {
            return res.status(404).json("Student not found");
        }
        res.json("Student Deleted");
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

router.get("/get/:id", auth, async (req, res) => {
    try {
        const user = await Student.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ status: "User not found" });
        }
        res.status(200).json({ status: "User fetched", user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with get user", error: err.message });
    }
});
module.exports = router;
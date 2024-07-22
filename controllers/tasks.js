const Task = require('../models/Task')

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({ tasks: tasks })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

exports.createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ mas: error })
    }
}

exports.getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOne({ _id: taskID })
        if (!task) {
            return res.status(404).json({ msg: `No task with id : ${taskID}` })
        }
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

exports.updateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true, runValidators: true
        })
        if (!task) {
            return res.status(404).json({ msg: `No task with id : ${taskID}` })
        }
        res.status(200).json({ id: taskID, data: req.body })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskID });
        if (!task) {
            return res.status(404).json({ msg: `No task with id : ${taskID}` })
        }
        // res.status(200).json({ task })
        // res.status(200).send()
        res.status(200).json({ task: null, status: 'success' })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}
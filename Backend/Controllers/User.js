const User = (req, res) => {
    return res.json({user:req.user});
}

module.exports = User
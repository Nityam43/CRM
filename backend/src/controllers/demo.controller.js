const demos = [];

exports.addDemo = (req, res) => {
    const newDemo = req.body;
    demos.push(newDemo);
    res.status(201).json(newDemo);
};

exports.getDemos = (req, res) => {
    res.status(200).json(demos);
};

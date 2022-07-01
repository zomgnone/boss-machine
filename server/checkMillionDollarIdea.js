const checkMillionDollarIdea = (req, res, next) => {
  const { weeklyRevenue, numWeeks } = req.body;
  const totalRevenue = Number(weeklyRevenue) * Number(numWeeks);
  if (!weeklyRevenue || !numWeeks || isNaN(totalRevenue) || totalRevenue < 1000000) {
    res.status(400).send();
  } else {
    next();
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;

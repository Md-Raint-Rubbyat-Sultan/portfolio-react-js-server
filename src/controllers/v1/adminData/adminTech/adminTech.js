import adminData from "../../../../models/adminData/adminData.js";

const adminTech = async (_, res) => {
  try {
    const result = await adminData.findOne({}, { technical_skills: 1, _id: 0 });
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export default adminTech;

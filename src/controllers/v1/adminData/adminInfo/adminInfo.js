import adminData from "../../../../models/adminData/adminData.js";

const adminInfo = async (_, res) => {
  try {
    const result = await adminData.findOne({});
    res.send(result);
  } catch (error) {
    res.status(500).send(err.message);
  }
};

export default adminInfo;

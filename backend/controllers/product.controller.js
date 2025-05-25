import Product from "../model/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const proDATA = await Product.find({});
    return res.status(200).json({ success: true, data: proDATA });
  } catch (error) {
    console.error("error fetching", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createProduct = async (req, res) => {
  // user will send this data
  const product = req.body;

  // check if all fields no data
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ succss: false, message: "Enter or fill all data" });
  }

  // if new data get
  const newProduct = new Product(product);

  try {
    // after getting data save in mongoDB
    await newProduct.save();
    // now data is created then show status something created 201
    return res.status(201).json({ succss: true, data: newProduct });
  } catch (error) {
    // send error
    console.error("Ërror in creating data", error.message);
    // send status 500
    return res.status(500).json({ succss: false, message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Data deleted" });
  } catch (error) {
    console.error("error deleting", error.message);
    return res
      .status(404)
      .json({ success: false, message: "Data not found for delete" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Invalid id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const Order = require("../model/Order");
const Cart = require("../model/Cart");

// Create Order
const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate(
      "products.product"
    );

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    let totalAmount = 0;

    cart.products.forEach((item) => {
      totalAmount += item.product.price * item.quantity;
    });

    const order = await Order.create({
      user: userId,
      products: cart.products,
      totalAmount,
      shippingAddress: {
        address: "Demo Address",
        city: "Lahore",
        postalCode: "54000",
        country: "Pakistan",
      },
      paymentMethod: "Cash on Delivery",
    });

    // Clear cart
    cart.products = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get My Orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).populate("products.product");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Orders (Admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { status }, 
      { 
        new: true, 
        runValidators: false,     // ← Ye important
        context: 'query' 
      }
    ).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    res.json({ 
      success: true, 
      message: "Order status updated successfully",
      order 
    });
  } catch (error) {
    console.error("Update Order Error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};
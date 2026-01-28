const verifyAdmin = (req, res, next) => {

  
  if (req.user && req.user.role === 'admin') {
    next(); // Silakan masuk, Tuan Atmin.
  } else {
    return res.status(403).json({ 
      success: false, 
      message: 'Akses Ditolak! Fitur ini khusus Admin loh ya' 
    });
  }
};

module.exports = { verifyAdmin };
import jwt from "jsonwebtoken";


export const protect = (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token =
                req.headers.authorization.split(" ")[1];
            const decoded =
                jwt.verify(
                    token,
                    process.env.JWT_SECRET
                );
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({
                message: "Not authorized"
            });
        }
    } else {
        res.status(401).json({
            message: "You need to be looged in"
        });
    }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next();
  };
};


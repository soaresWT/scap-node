const checkAdminPermission = (req, res, next) => {
    const requestingUser = req.user;
    if (requestingUser.role !== 'admin') {
        return res.status(403).json({ message: 'Sem permissão para realizar esta ação' });
    }

    next();
};

export default checkAdminPermission;

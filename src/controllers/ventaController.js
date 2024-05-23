const controller = {}

// Listar ventas
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.json(err);

        conn.query('SELECT * FROM venta', (err, ventas) => {
            if (err) return res.json(err);

            res.render('ventas', {
                data: ventas
            });
        });
    });
}

// Guardar venta
controller.save = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.json(err);

        conn.query('INSERT INTO venta SET ?', [data], (err, venta) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al agregar venta. Asegúrate de que el ID del producto sea válido.');
            }

            res.redirect('/ventas');
        });
    });
}

// Editar venta
controller.edit = (req, res) => {
    const { id_venta } = req.params;
    req.getConnection((err, conn) => {
        if (err) return res.json(err);

        conn.query('SELECT * FROM venta WHERE id_venta = ?', [id_venta], (err, rows) => {
            if (err) return res.json(err);

            res.render('venta_edit', {
                data: rows[0]
            });
        });
    });
}

controller.update = (req, res) => {
    const { id_venta } = req.params;
    const newVenta = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.json(err);

        conn.query('UPDATE venta SET ? WHERE id_venta = ?', [newVenta, id_venta], (err, rows) => {
            if (err) return res.json(err);

            res.redirect('/ventas');
        });
    });
}

// Eliminar venta
controller.delete = (req, res) => {
    const { id_venta } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.json(err);

        conn.query('DELETE FROM venta WHERE id_venta = ?', [id_venta], (err, rows) => {
            if (err) return res.json(err);

            res.redirect('/ventas');
        });
    });
}

module.exports = controller;

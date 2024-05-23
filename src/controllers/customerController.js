const controller = {}

// Listar clientes
// En el controlador customerController
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.json(err);

        // Obtener la lista de clientes
        conn.query('SELECT * FROM cliente', (err, customers) => {
            if (err) return res.json(err);

            // Obtener la lista de ventas
            conn.query('SELECT * FROM venta', (err, ventas) => {
                if (err) return res.json(err);

                // Renderizar la vista de clientes con la lista de clientes y la lista de ventas
                res.render('customers', {
                    data: customers,
                    ventas: ventas  // Pasar la lista de ventas a la vista
                });
            });
        });
    });
}

controller.save = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.json(err);

        conn.query('INSERT INTO cliente SET ?', [data], (err, customer) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al agregar cliente. Asegúrate de que el ID de venta sea válido.');
            }

            // Redirige al usuario a la página de clientes después de agregar el cliente
            res.redirect('/clientes');
        });
    });
}

// Editar cliente
controller.edit = (req, res) => {
    const { id_cliente } = req.params;
    req.getConnection((err, conn) => {
        if (err) return res.json(err);

        conn.query('SELECT * FROM cliente WHERE id_cliente = ?', [id_cliente], (err, rows) => {
            if (err) return res.json(err);

            res.render('customer_edit', {
                data: rows[0]
            });
        });
    });
}

controller.update = (req, res) => {
    const { id_cliente } = req.params;
    const newCustomer = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.json(err);

        conn.query('UPDATE cliente SET ? WHERE id_cliente = ?', [newCustomer, id_cliente], (err, rows) => {
            if (err) return res.json(err);

            res.redirect('/');
        });
    });
}

// Eliminar cliente
// Eliminar cliente
// Eliminar cliente
controller.delete = (req, res) => {
    const { id_cliente } = req.params;

    req.getConnection((err, conn) => {
        if (err) return res.json(err);

        conn.query('DELETE FROM cliente WHERE id_cliente = ?', [id_cliente], (err, result) => {
            if (err) return res.json(err);

            // Obtener la lista actualizada de clientes
            conn.query('SELECT * FROM cliente', (err, customers) => {
                if (err) return res.json(err);

                // Obtener la lista de ventas para el dropdown
                conn.query('SELECT id_venta FROM venta', (err, ventas) => {
                    if (err) return res.json(err);

                    // Renderizar la vista de clientes con los datos actualizados y las ventas
                    res.render('customers', { data: customers, ventas: ventas });
                });
            });
        });
    });
}



module.exports = controller;

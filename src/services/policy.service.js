const pool = require("../config/db");

exports.createPolicy = async (data) => {
  const { title, description, file_name, file_data, file_size } = data;

  const { rows } = await pool.query(
    `INSERT INTO policy_documents
     (title, description, file_name, file_data, file_size)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING *`,
    [title, description, file_name, file_data, file_size],
  );

  return rows[0];
};

exports.getAllPolicies = async () => {
  const { rows } = await pool.query(
    `SELECT id, title, description, file_name, file_size, created_at
     FROM policy_documents ORDER BY created_at DESC`,
  );
  return rows;
};

exports.getPolicyById = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM policy_documents WHERE id=$1",
    [id],
  );
  return rows[0];
};

exports.updatePolicy = async (id, title, description, fileData) => {
  const { rows } = await pool.query(
    `UPDATE policy_documents
     SET title = COALESCE($1, title),
         description = COALESCE($2, description),
         file_name = COALESCE($3, file_name),
         file_data = COALESCE($4, file_data),
         file_size = COALESCE($5, file_size),
         updated_at = NOW()
     WHERE id = $6
     RETURNING *`,
    [
      title,
      description,
      fileData?.file_name ?? null,
      fileData?.file_data ?? null,
      fileData?.file_size ?? null,
      id,
    ],
  );

  return rows[0]; // undefined if not found
};

exports.deletePolicy = async (id) => {
  const { rows } = await pool.query(
    `DELETE FROM policy_documents
     WHERE id = $1
     RETURNING id`,
    [id],
  );

  return rows[0]; // undefined if not found
};

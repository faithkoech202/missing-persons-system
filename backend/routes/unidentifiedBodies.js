router.post('/', upload.single('photo'), async (req, res) => {
  const { gender, age_estimate, found_location, date_found, physical_description } = req.body;
  const photo_path = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO unidentified_bodies 
    (gender, age_estimate, found_location, date_found, physical_description, photo) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  await db.query(sql, [gender, age_estimate, found_location, date_found, physical_description, photo_path]);

  res.status(201).json({ message: 'Unidentified body report submitted' });
});

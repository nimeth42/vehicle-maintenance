const AWS = require('aws-sdk');
const multer = require('multer'); // Add multer for handling multipart form data

// const s3 = new AWS.S3({ 
//     accessKeyId: 'AKIAU6GD2JKHLGGGSZHN',
//     secretAccessKey: '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',
//     region: 'Regious: Asia Pacific (Mumbai) ap-south-1'
//  });

// Configure multer for image uploads
const upload = multer({
  dest: 'uploads/', // Temporary storage location for images
  limits: { fileSize: 5000000 }, // Limit image size to 5MB (optional)
});

const uploadFile = (req, res) => {
  upload.single('photo')(req, res, async (err) => {
    if (err) {
      console.error('Error uploading image:', err);
      return res.status(500).json({ message: 'Error uploading image' });
    }

    const { file, body } = req; // Access uploaded image and other form data
    const { note, cost } = body; // Extract note and cost from form data

    if (!note.trim() || !cost.trim() || !file) {
      return res.status(400).json({ message: 'Please fill in all fields and select an image' });
    }

    const params = {
      Bucket: 'arn:aws:s3:::drivecar', // bucket name
      Key: `${Date.now()}-${file.originalname}`, // Generate unique filename
      Body: fs.createReadStream(file.path), // Read image data from temporary storage
    };

    try {
      const uploadResult = await s3.upload(params).promise();
      console.log(`File uploaded successfully: ${uploadResult.Location}`);

      // You can now store the image URL and other data in your database
      // ...

      return res.status(200).json({ message: 'Maintenance data submitted successfully' });
    } catch (error) {
      console.error('Error uploading image to S3:', error);
      return res.status(500).json({ message: 'Error submitting maintenance data' });
    } finally {
      // Clean up temporary image file (optional)
      fs.unlink(file.path, (err) => {
        if (err) console.error('Error deleting temporary image:', err);
      });
    }
  });
};

module.exports = { uploadFile };

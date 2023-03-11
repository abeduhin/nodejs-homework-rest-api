const fs = require("fs/promises")
const path = require("path")
const Jimp = require("jimp")

const { User } = require("../../models/users")

const avatarsDir = path.join(__dirname, "../..", "public", "avatars")

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file; 
  
    const expention = originalname.split(".").pop();
    const filename = `${_id}.${expention}`;
    
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", filename);
  const minAvatarURL = path.join("public/avatars", filename);

  Jimp.read(minAvatarURL, (error, filename) => {
    if (error) throw error;
    filename.resize(250, 250).quality(60).write(minAvatarURL);
  });

  await User.findByIdAndUpdate(_id, { avatarURL: minAvatarURL });
  

  res.json({
    аvatarURL: "тут буде посилання на зображення",
      avatarURL
  });
};

module.exports = updateAvatar;
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');

class UserSevices {
  async getUser(id) {
    const user = await User.findById(id);
    if (!user) throw new Error('Could not get user with the given ID.');
    return user;
  }

  // async postUser(data, files) {
  //     const { error } = validate(data);
  //     if (error) throw new Error(error.details[0].message);

  //     let user = await User.findOne({ email: data.email });
  //     if (user) throw new Error('User already registered.');

  //     if (!files || Object.keys(files).length === 0 ) {
  //         throw new Error('No files were uploaded.');
  //     }

  //     const uploadPath = 'uploads/' + files.photo.name;
  //     // console.log(files.name)
  //     files.photo.mv(uploadPath, function (err) {
  //         // console.log(err)
  //         if (err) {
  //             throw new Error('Internal server error.');
  //         }
  //         return ('File uploaded to ' + uploadPath)
  //     })

  //     user = new User({
  //         photo: uploadPath,
  //         firstName: data.firstName,
  //         lastName: data.lastName,
  //         email: data.email,
  //         password: data.password,
  //         phoneNumber: data.phoneNumber,
  //         adress: data.adress,
  //         jobTitle: data.jobTitle,
  //         about: data.about,
  //         isAdmin: data.isAdmin
  //     })

  //     const salt = await bcrypt.genSalt(10);
  //     user.password = await bcrypt.hash(user.password, salt);

  //     await user.save();

  //     return user;
  // }

  async postUser(data, files) {
    const { error } = validate(data);
    if (error) throw new Error(error.details[0].message);

    let user = await User.findOne({ email: data.email });
    if (user) throw new Error('User already registered.');

    if (!files || Object.keys(files).length === 0) {
      throw new Error('No files were uploaded.');
    }

    const uploadPath = 'uploads/' + files.photo.name;
    // console.log(files.name)
    files.photo.mv(uploadPath, function (err) {
      // console.log(err)
      if (err) {
        throw new Error('Internal server error.');
      }
      return 'File uploaded to ' + uploadPath;
    });

    user = new User({
      photo: files.photo.name,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      adress: data.adress,
      jobTitle: data.jobTitle,
      about: data.about,
      isAdmin: data.isAdmin,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    return user;
  }

  async patchUser(id, data, files) {
    const { error } = validate(data);
    console.log(error);
    if (error) throw new Error(error.details[0].message);

    if (files) {
      const uploadPath = 'uploads/' + files.photo.name;
      files.photo.mv(uploadPath, function (err) {
        if (err) {
          throw new Error('Internal server error.');
        }
        return 'File uploaded to ' + uploadPath;
      });

      data.photo = files.photo.name;
    }

    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
      console.log(salt);
      console.log(data.password);
    }

    let user = await User.findByIdAndUpdate(
      { _id: id },
      {
        $set: data,
      },
      { new: true }
    );

    if (!user) throw new Error('The user with the given ID was not found.');

    return user;
  }

  // async patchUser(id, data) {

  //     const { error } = validate(data);
  //     if (error) throw new Error(error.details[0].message);

  //     const user = await User.findByIdAndUpdate({_id: id},
  //         {
  //             $set: data
  //         }, {new: true} );

  //     if (!user) throw new Error('The user with the given ID was not found.');

  //     return user;
  // }

  async deleteUser(id) {
    const user = await User.findByIdAndRemove(id);
    if (!user) throw new Error('The user with the given ID was not found.');

    return user;
  }

  async getUsers() {
    const users = await User.find();
    if (!users) throw new Error('Could not get users.');

    return users;
  }
}

module.exports = new UserSevices();

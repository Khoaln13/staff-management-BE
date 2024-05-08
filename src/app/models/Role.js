const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    { collection: 'roles' },
);

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;

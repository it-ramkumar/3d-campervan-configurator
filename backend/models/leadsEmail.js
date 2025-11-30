const mongoose = require('mongoose');

const EmailSettingsSchema = new mongoose.Schema({
  senderEmail: {
    type: String,
    required: true,
    unique: true,
  },
  encryptedPassword: {
    type: String,
    required: true, // AES-256-GCM encrypted
  },
  recipients: {
    type: [String],
    default: [], // dashboard se add/remove honge
    validate: {
      validator: function(arr) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return arr.every(e => emailRegex.test(e));
      },
      message: 'All recipients must be valid emails'
    }
  }
}, { timestamps: true });

// Static helper: fetch first (or only) email settings doc
EmailSettingsSchema.statics.getSettings = async function() {
  let doc = await this.findOne();
  return doc;
};

// Static helper: add recipient
EmailSettingsSchema.statics.addRecipient = async function(email) {
  const doc = await this.getSettings();
  if (!doc) return null;
  if (!doc.recipients.includes(email)) {
    doc.recipients.push(email);
    await doc.save();
  }
  return doc;
};

// Static helper: remove recipient
EmailSettingsSchema.statics.removeRecipient = async function(email) {
  const doc = await this.getSettings();
  if (!doc) return null;
  doc.recipients = doc.recipients.filter(e => e !== email);
  await doc.save();
  return doc;
};

module.exports = mongoose.model('EmailSettings', EmailSettingsSchema);

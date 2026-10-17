import mongoose from 'mongoose';

const OnboardingSchema = new mongoose.Schema(
  {
    fullName: String,
    contact: String,
    alternate: String,
    email: String,
    password: String,
    newDomainEmail: Boolean,
    ecommerce: Boolean,
    requirements: String,
    docs: Object,
    signature: String,
    status: { type: String, default: 'pending' },
  },
  { timestamps: true }
);

export default mongoose.models.Onboarding || mongoose.model('Onboarding', OnboardingSchema);

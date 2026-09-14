import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import Badge from '../common/Badge';

/**
 * AddressForm Component for adding a new Karimnagar delivery address.
 */
export default function AddressForm({
  onSave,
  onCancel,
  initialValues = {}
}) {
  const [formData, setFormData] = useState({
    fullName: initialValues.fullName || 'Rahul Verma',
    phone: initialValues.phone || '9876543210',
    house: initialValues.house || '',
    street: initialValues.street || '',
    city: initialValues.city || 'Karimnagar',
    state: initialValues.state || 'Telangana',
    pincode: initialValues.pincode || '505001',
    type: initialValues.type || 'Home',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your full name.';
    if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    if (!formData.house.trim()) newErrors.house = 'Please enter house/flat/building details.';
    if (!formData.street.trim()) newErrors.street = 'Please enter street or area name.';
    if (!formData.pincode.trim() || formData.pincode.length !== 6) newErrors.pincode = 'Please enter a valid 6-digit pincode.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        id: `addr-${Date.now()}`,
        ...formData,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-[20px] border border-[#E4E4DA] p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-[#E4E4DA]">
        <h3 className="text-base font-bold text-[#20231B]">
          Add New Delivery Address
        </h3>
        <Badge variant="cream" size="sm">KARIMNAGAR</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <Input
          label="Full Name *"
          placeholder="Enter full name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          error={errors.fullName}
        />
        <Input
          label="Phone Number *"
          placeholder="Enter 10-digit mobile number"
          maxLength={10}
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
          error={errors.phone}
        />
      </div>

      <Input
        label="House / Flat / Building Name *"
        placeholder="H.No 12-4-123, Flat 201..."
        value={formData.house}
        onChange={(e) => setFormData({ ...formData, house: e.target.value })}
        error={errors.house}
      />

      <Input
        label="Street / Area / Landmark *"
        placeholder="Collectorate Road, Mukarampura..."
        value={formData.street}
        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
        error={errors.street}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <Input
          label="City"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />
        <Input
          label="State"
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
        />
        <Input
          label="Pincode *"
          placeholder="505001"
          maxLength={6}
          value={formData.pincode}
          onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
          error={errors.pincode}
        />
      </div>

      {/* Address Type Selector */}
      <div className="space-y-1.5 pt-1">
        <label className="text-xs font-semibold text-[#20231B]">
          Address Type
        </label>
        <div className="flex items-center gap-2">
          {['Home', 'Work', 'Other'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFormData({ ...formData, type: t })}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                formData.type === t
                  ? 'bg-[#667A3E] text-white shadow-xs'
                  : 'bg-[#FAF8F1] text-[#20231B] border border-[#E4E4DA] hover:bg-[#E8EEDB]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Form Buttons */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E4E4DA]">
        {onCancel && (
          <Button variant="outline" size="sm" type="button" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button variant="primary" size="md" type="submit">
          Save Address
        </Button>
      </div>
    </form>
  );
}

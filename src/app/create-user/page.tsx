'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers,
  createUser,
  updateUser,
  User,
} from '@/redux/slice/userSlice';
import { AppDispatch, RootState } from '@/store';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    fname: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.fname ||
      !formData.phone
    ) {
      alert('Please fill all fields');
      return;
    }

    if (isEditing && editId !== null) {
      dispatch(
        updateUser({
          id: editId,
          name: formData.name,
          email: formData.email,
          fname: formData.fname,
          phone: Number(formData.phone),
        })
      );
    } else {
      dispatch(
        createUser({
          name: formData.name,
          email: formData.email,
          fname: formData.fname,
          phone: Number(formData.phone),
        })
      );
    }

    // Reset form
    setFormData({ name: '', email: '', phone: '', fname: '' });
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>
        {isEditing ? 'Update User' : 'Create User'}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="First Name"
          value={formData.name}
          onChange={handleChange}
          className="form-control"
        />
        <input
          type="text"
          name="fname"
          placeholder="Last Name"
          value={formData.fname}
          onChange={handleChange}
          className="form-control"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
        />
        <input
          type="number"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-control"
        />
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <button type="submit" style={{ color: '#fff', padding: '8px 15px' }}>
            {isEditing ? 'Update User' : 'Add User'}
          </button>
        </div>
      </form>

      <hr />

   
    </div>
  );
}

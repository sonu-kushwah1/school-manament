'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { fetchUserById } from '@/redux/slice/userSlice';
import type { AppDispatch, RootState } from '@/store';

export default function ReadUserPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { singleUser, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(Number(id)));
    }
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!singleUser) return <p>No user found</p>;

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2>User Details</h2>
      <p><strong>ID:</strong> {singleUser.id}</p>
      <p><strong>First Name:</strong> {singleUser.name}</p>
      <p><strong>Last Name:</strong> {singleUser.fname}</p>
      <p><strong>Email:</strong> {singleUser.email}</p>
      <p><strong>Phone:</strong> {singleUser.phone}</p>
    </div>
  );
}

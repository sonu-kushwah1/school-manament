'use client';

import * as React from 'react';
import {Box,Typography} from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

interface BasicBreadcrumbsProps {
  currentPage: string;
}

const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
};

const BasicBreadcrumbs: React.FC<BasicBreadcrumbsProps> = ({ currentPage }) => {
  return (
    <Box role="presentation" onClick={handleClick} sx={{mb:3}}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="rgb(3 35 93 / 60%)" href="/">
          Home
        </Link>
        <Typography sx={{ color: 'text.primary' }}>
          {currentPage}
        </Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default BasicBreadcrumbs;

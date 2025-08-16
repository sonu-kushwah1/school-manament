import React from "react";
import LayoutWrapper from "@/component/Layout";
import { Typography, Grid, Box, Stack } from "@mui/material";
import styled from "./styled.module.css";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import CheckIcon from '@mui/icons-material/Check';
 import CloseIcon from '@mui/icons-material/Close';

const Dashboard: React.FC = () => {
  return (
    <div>
      <LayoutWrapper>
        <BasicBreadcrumbs heading="Attendace" currentPage="Attendace" />
        <Box>
          <div className="custom-table-container attendance">
          <table className="custom-table">
              <thead>
                <tr>
                  <th className="text-left">Students</th>
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                  <th>5</th>
                  <th>6</th>
                  <th>7</th>
                  <th>8</th>
                  <th>9</th>
                  <th>10</th>
                  <th>11</th>
                  <th>12</th>
                  <th>13</th>
                  <th>14</th>
                  <th>15</th>
                  <th>16</th>
                  <th>17</th>
                  <th>18</th>
                  <th>19</th>
                  <th>20</th>
                  <th>21</th>
                  <th>22</th>
                  <th>23</th>
                  <th>24</th>
                  <th>25</th>
                  <th>26</th>
                  <th>27</th>
                  <th>28</th>
                  <th>29</th>
                  <th>30</th>
                  <th>31</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-left">Michele Johnson</td>
                  <td>
                     <CheckIcon  className="green"/>
                  </td>
                  <td>
                        <CloseIcon className="danger"/>
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                     <CloseIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>-</td>
                  <td>
                     <CloseIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                     <CloseIcon />
                  </td>
                  <td>-</td>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                     <CloseIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>-</td>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                     <CloseIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>-</td>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Box>
      </LayoutWrapper>
    </div>
  );
};

export default Dashboard;

import moment from 'moment';
import { useEffect, useState } from 'react';
import ApiService from '../../../../Utils/ApiService';
import InvoiceLogo from '../../../Images/logo.png';
import { Drawer } from '../../Common/Drawer';
import { Table } from '../../Common/Table';
import '../styles.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const StudentFees = () => {
  const [studentFees, setStudentFes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawer, setDrawer] = useState({ open: false, fee: null });

  const columns = ({ downloadInvoice }) => {
    return [
      {
        label: 'Student',
        key: 'student',
        renderValue: (value) => {
          return [value?.firstName, value?.lastName].filter(Boolean).join(' ');
        },
      },
      {
        label: 'Total Fees',
        key: 'totalFees',
        renderValue: (value, row) => {
          return row?.student
            ? Number(row?.student?.totalFees).toLocaleString('en-US', {
                minimumFractionDigits: 0,
              })
            : 'N/A';
        },
      },
      {
        label: 'Remaining Fees',
        key: 'remainingFees',
        renderValue: (value, row) => {
          return row?.student
            ? Number(row?.student?.remainingFees).toLocaleString('en-US', {
                minimumFractionDigits: 0,
              })
            : 'N/A';
        },
      },
      {
        label: 'Fees Amount',
        key: 'feesAmount',
        renderValue: (value) => {
          return value
            ? Number(value).toLocaleString('en-US', {
                minimumFractionDigits: 0,
              })
            : 'N/A';
        },
      },
      {
        label: 'Payment Date',
        key: 'paymentDate',
        renderValue: (value) => {
          return value && moment(value).isValid()
            ? moment(value).format('DD MMMM YYYY')
            : 'N/A';
        },
      },
      {
        label: 'Install. Number',
        key: 'installmentNumber',
        renderValue: (value) => {
          return value || 'N/A';
        },
      },
      {
        label: 'Receipt Number',
        key: 'receiptNo',
        renderValue: (value) => {
          return value || 'N/A';
        },
      },
      {
        label: 'Payment By',
        key: 'paymentType',
        renderValue: (value) => {
          return value || 'N/A';
        },
      },
      {
        label: 'Download Invoice',
        key: 'downloadInvoice',
        renderValue: (value, row) => {
          return (
            <button onClick={() => downloadInvoice(row)}>
              Download Invoice
            </button>
          );
        },
      },
    ];
  };

  const localStore = JSON.parse(
    localStorage.getItem('ims:auth:profile') || '{}'
  );

  const getStudentFees = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.get(
        `${ApiService.ApiURLs.getStudentFees}?student=${localStore?._id}`
      );
      if (resp.status === 200 && resp.data?.data) {
        console.log(resp.data.data);
        setStudentFes(resp.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStore?._id) getStudentFees();
  }, [localStore?._id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  function printDocument() {
    const input = document.getElementById('fees-invoice');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'px', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'JPEG', 15, 15, width - 30, height - 30);
      pdf.save(`${drawer.fee?._id || 'fees'}.pdf`);
    });
  }

  return (
    <>
      <div className="card-container">
        <div className="fees-summary-card fees-summary-total">
          <div className="summary-content">
            <p>
              <strong>Total Fees:</strong> $
              {studentFees.length
                ? Number(
                    studentFees[0]?.student?.totalFees || 0
                  ).toLocaleString('en-US', {
                    minimumFractionDigits: 0,
                  })
                : '0'}
            </p>
          </div>
        </div>
        <div className="fees-summary-card fees-summary-paid">
          <div className="summary-content">
            <p>
              <strong>Paid Fees:</strong> $
              {Number(
                studentFees.reduce(
                  (prev, fees) => prev + Number(fees?.feesAmount || 0),
                  0
                )
              ).toLocaleString('en-US', {
                minimumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>
        <div className="fees-summary-card fees-summary-remaining">
          <div className="summary-content">
            <p>
              <strong>Remaining Fees:</strong> $
              {studentFees.length
                ? Number(
                    studentFees[0]?.student?.remainingFees || 0
                  ).toLocaleString('en-US', {
                    minimumFractionDigits: 0,
                  })
                : '0'}
            </p>
          </div>
        </div>
      </div>
      {studentFees[0]?.feesAmount ? (
        <Table
          columns={columns({
            downloadInvoice: (row) => {
              setDrawer({
                fee: {
                  ...row,
                  remainingFees: Number(
                    studentFees[0]?.student?.remainingFees || 0
                  ),
                  totalFees: Number(studentFees[0]?.student?.totalFees || 0),
                },
                open: true,
              });
            },
          })}
          rows={studentFees}
        />
      ) : (
        <></>
      )}
      {drawer.open && drawer.fee ? (
        <div className="student-fees-invoice">
          <Drawer
            title={'Fees'}
            isOpen={drawer.open}
            onClose={() => setDrawer({ fee: null, open: false })}
            footer={
              <>
                <button onClick={printDocument}>Download</button>
              </>
            }
          >
            <div className="fees-invoice" id="fees-invoice">
              <div className="invoice-header">
                <img
                  src={InvoiceLogo}
                  alt="Institute Logo"
                  className="invoice-logo"
                />
                <div className="invoice-header-details">
                  <h1 className="institute-name">Institute Master</h1>
                  <p className="invoice-date">
                    Date:{' '}
                    {drawer.fee?.paymentDate && moment(drawer.fee.paymentDate)
                      ? moment(drawer.fee.paymentDate).format('MMMM DD, YYYY')
                      : 'N/A'}
                  </p>
                </div>
              </div>
              <div className="invoice-body">
                <h2 className="invoice-title">Fees Invoice</h2>
                <p>
                  <strong>Student Name:</strong>{' '}
                  {[
                    drawer.fee.student?.firstName,
                    drawer.fee.student?.middleName,
                    drawer.fee.student?.lastName,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                </p>
                <p>
                  <strong>Total Fees:</strong> ${' '}
                  {Number(drawer.fee?.totalFees || 0).toLocaleString('en-US', {
                    minimumFractionDigits: 0,
                  })}
                </p>
                <p>
                  <strong>Paid Fees:</strong> ${' '}
                  {Number(drawer.fee?.feesAmount || 0).toLocaleString('en-US', {
                    minimumFractionDigits: 0,
                  })}
                </p>
                <p>
                  <strong>Remaining Fees:</strong> ${' '}
                  {Number(drawer.fee?.remainingFees || 0).toLocaleString(
                    'en-US',
                    {
                      minimumFractionDigits: 0,
                    }
                  )}
                </p>
                <div className="invoice-details">
                  <h3>Installment Details</h3>
                  <table className="invoice-details-table">
                    <thead>
                      <tr>
                        <th>Installment</th>
                        <th>Amount</th>
                        <th>Payment Date</th>
                        <th>Payment Type</th>
                        <th>Invoice Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>
                          ${' '}
                          {Number(drawer.fee?.feesAmount || 0).toLocaleString(
                            'en-US',
                            {
                              minimumFractionDigits: 0,
                            }
                          )}
                        </td>
                        <td>
                          {drawer.fee?.paymentDate &&
                          moment(drawer.fee.paymentDate)
                            ? moment(drawer.fee.paymentDate).format(
                                'MMMM DD, YYYY'
                              )
                            : 'N/A'}
                        </td>
                        <td>{drawer.fee?.paymentType || 'N/A'}</td>
                        <td>{drawer.fee?.installmentNumber || 'N/A'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="invoice-footer">
                <p className="footer-text">Thank you for your payment!</p>
              </div>
            </div>
          </Drawer>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

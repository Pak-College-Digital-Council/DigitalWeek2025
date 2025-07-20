import { h } from 'preact';

const LibraryNoticeEmail = () => {
  const content = `Library Book Reminder


Your library book/s will be due soon. Please return or renew them before the dates.



Title: Around the world in 80 days
Author: Verne, Jules
Classification: F VERN
Barcode: L484350047
Date due: 11/08/2025

Title: The time machine
Author: Wells, H.G.
Classification: F WELL
Barcode: L375700047
Date due: 11/08/2025

Items due: 2


Library Manager
Pakuranga College Library
Pigeon Mountain Road
Half Moon Bay
Auckland 2012

Phone: 09 534 7159
Email: library@pakuranga.school.nz`;

  return (
    <div className="library-notice-content-wrapper">
      <div style={{whiteSpace: 'pre-wrap'}}>
        <span data-hint-id="ln-content-detail">
{`Library Book Reminder


Your library book/s will be due soon. Please return or renew them before the dates.



Title: Around the world in 80 days
Author: Verne, Jules
Classification: F VERN
Barcode: L484350047
Date due: 11/08/2025

Title: The time machine
Author: Wells, H.G.
Classification: F WELL
Barcode: L375700047
Date due: 11/08/2025

Items due: 2`}
        </span>
{`


Library Manager
Pakuranga College Library
Pigeon Mountain Road
Half Moon Bay
Auckland 2012

`}
        <span data-hint-id="ln-contact">
{`Phone: 09 534 7159
Email: library@pakuranga.school.nz`}
        </span>
      </div>
    </div>
  );
};

export default LibraryNoticeEmail;
import { h } from 'preact';

const LoadingSpinner = () => (
  <div class="loading-spinner-container">
    <div class="cb-spinner">
      <div class="cb-spinner-dot"></div>
      <div class="cb-spinner-dot"></div>
      <div class="cb-spinner-dot"></div>
      <div class="cb-spinner-dot"></div>
      <div class="cb-spinner-dot"></div>
      <div class="cb-spinner-dot"></div>
    </div>
  </div>
);

export default LoadingSpinner;
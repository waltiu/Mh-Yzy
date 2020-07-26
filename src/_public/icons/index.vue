<template>
  <div>
    <svg
      :id="className"
      v-if="svgType === 'unknown'"
      t="1562024181398"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="1397"
      :width="width"
      :height="height"
    >
      <path
        d="M526.783825 5.989292c-103.517489 0-184.644241 29.373126-243.380255 89.455451C224.744342 154.180757 195.386573 233.884411 195.386573 335.963447h146.75813c0-61.433755 12.623585-109.061424 37.788849-142.570745 27.939791-40.635043 74.129006-60.16423 137.001215-60.164229 50.335648 0 90.899024 13.969896 118.915601 41.909686 26.516694 28.026815 40.563376 65.733759 40.563375 114.70262 0 36.355514-14.046681 69.931383-39.211945 102.079036l-23.726811 26.583242c-86.696281 76.852342-139.867884 134.236926-158.05588 173.377205-19.534306 36.345276-27.939791 81.101156-27.939791 132.86502v23.742168h149.619681v-23.742168c0-33.580988 6.992626-64.285067 22.37538-92.306763 12.54168-25.19086 32.168129-50.330529 58.679704-72.721267 65.713283-57.389703 104.930348-93.750336 117.472028-109.07678 35.014322-44.760999 53.192079-102.073916 53.19208-170.577084 0-83.896159-28.026815-151.058134-83.911517-200.026995-55.951249-50.315172-128.672516-74.047101-218.122847-74.047101z m-25.165264 818.014427c-28.00122 0-53.181841 8.37989-72.787815 27.924434-19.518949 18.259662-29.286102 41.976234-29.286102 71.369837 0 28.00122 9.772272 51.743387 29.286102 71.354479 19.611092 19.524068 44.781475 29.347531 72.787815 29.347531 27.950029 0 53.094817-9.823463 72.716147-28.00122 19.518949-19.605973 30.714318-43.337902 30.714318-72.705909 0-29.393602-9.767153-53.110175-29.373126-71.369837-19.595735-19.534306-44.766118-27.919315-74.057339-27.919315z"
        :fill="color"
        p-id="1398"
      />
    </svg>
    <svg
      :id="className"
      v-if="svgType === 'cited'"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      :width="width"
      :height="height"
      viewBox="0 0 110 110"
      enable-background="new 0 0 110 110"
      xml:space="preserve"
    >
      <g>
        <circle
          fill="#FFFFFF"
          :stroke="color"
          stroke-width="14"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          cx="55"
          cy="55"
          r="44.876"
        />
      </g>
      <g>
        <circle :fill="color" cx="55" cy="55" r="21.842" />
      </g>
    </svg>
    <svg
      :id="className"
      v-if="svgType === 'deviceRoom'"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      :width="width"
      :height="height"
      viewBox="0 0 110 110"
      enable-background="new 0 0 110 110"
      xml:space="preserve"
    >
      <polygon
        fill="#FFFFFF"
        points="15.482,34.613 53.118,12.885 90.754,34.613 90.753,78.07 53.118,99.799 15.482,78.07 "
      />
      <polygon
        fill="none"
        :stroke="color"
        stroke-width="11.7062"
        stroke-miterlimit="10"
        points="15.047,33.697 53.577,11.452
 92.107,33.697 92.107,78.189 53.577,100.435 15.047,78.189 "
      />
      <polygon
        :fill="color"
        points="29.489,57.562 29.489,87.314 47.567,87.314 47.567,68.747 58.476,68.747 58.476,87.314
 77.663,87.314 77.663,57.562 "
      />
      <polygon
        :fill="color"
        points="75.755,45.028 75.755,36.794 68.185,36.794 68.185,40.368 53.223,31.159 23.58,49.839 23.58,54.822
 83.572,54.822 83.572,49.84 "
      />
    </svg>

    <svg
      :id="className"
      v-if="svgType === 'device'"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      :width="width"
      :height="height"
      viewBox="0 0 110 110"
      enable-background="new 0 0 110 110"
      xml:space="preserve"
    >
      <path
        fill="#FFFFFF"
        d="M98.252,86.945c0,7.828-6.346,14.173-14.173,14.173H28.642c-7.827,0-14.173-6.346-14.173-14.173V30.354
 c0-7.828,6.346-14.173,14.173-14.173h55.438c7.827,0,14.173,6.346,14.173,14.173V86.945z"
      />
      <path
        fill="none"
        :stroke="color"
        stroke-width="8.388"
        stroke-miterlimit="10"
        d="M99.435,85.79
 c0,8.742-7.087,15.829-15.829,15.829H29.229c-8.742,0-15.829-7.087-15.829-15.829V31.414c0-8.742,7.087-15.829,15.829-15.829h54.376
 c8.742,0,15.829,7.087,15.829,15.829V85.79z"
      />
      <g>
        <path
          :fill="color"
          d="M86.096,28.225H27.02c-2.251,0-4.075,1.826-4.075,4.078v2.055h37.432v4.669H22.944v2.056
  c0,2.251,1.824,4.076,4.075,4.076h59.076c2.251,0,4.077-1.825,4.077-4.076v-8.78C90.173,30.051,88.347,28.225,86.096,28.225z
   M81.203,40.079c-1.824,0-3.305-1.48-3.305-3.305s1.48-3.306,3.305-3.306c1.826,0,3.306,1.48,3.306,3.306
  S83.029,40.079,81.203,40.079z"
        />
        <path
          :fill="color"
          d="M86.096,50.135H27.02c-2.251,0-4.075,1.826-4.075,4.077v2.055h37.432v4.669H22.944v2.056
  c0,2.251,1.824,4.076,4.075,4.076h59.076c2.251,0,4.077-1.824,4.077-4.076v-8.78C90.173,51.961,88.347,50.135,86.096,50.135z
   M81.203,61.989c-1.824,0-3.305-1.48-3.305-3.305s1.48-3.305,3.305-3.305c1.826,0,3.306,1.48,3.306,3.305
  S83.029,61.989,81.203,61.989z"
        />
        <path
          :fill="color"
          d="M86.096,72.045H27.02c-2.251,0-4.075,1.826-4.075,4.078v2.055h37.432v4.669H22.944v2.057
  c0,2.251,1.824,4.076,4.075,4.076h59.076c2.251,0,4.077-1.825,4.077-4.076v-8.78C90.173,73.871,88.347,72.045,86.096,72.045z
   M81.203,83.899c-1.824,0-3.305-1.48-3.305-3.305c0-1.825,1.48-3.305,3.305-3.305c1.826,0,3.306,1.48,3.306,3.305
  C84.509,82.419,83.029,83.899,81.203,83.899z"
        />
      </g>
    </svg>

    <svg
      :id="className"
      v-if="svgType === 'odf'"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      :width="width"
      :height="height"
      viewBox="0 0 110 110"
      enable-background="new 0 0 110 110"
      xml:space="preserve"
    >
      <path
        fill="#FFFFFF"
        d="M108.398,72.201c0,7.94-6.437,14.376-14.376,14.376H18.36c-7.94,0-14.376-6.437-14.376-14.376V35.636
 c0-7.94,6.437-14.376,14.376-14.376h75.662c7.939,0,14.376,6.437,14.376,14.376V72.201z"
      />
      <path
        :fill="color"
        d="M92.676,18.969H17.324c-9.038,0-16.39,7.353-16.39,16.39v37.263c0,9.038,7.353,16.39,16.39,16.39h75.352
 c9.038,0,16.39-7.353,16.39-16.39V35.359C109.066,26.322,101.713,18.969,92.676,18.969z M105.062,39.972
 c0,2.218-1.479,4.077-3.501,4.683v0.277c1.509,0.836,2.538,2.435,2.538,4.283v9.272c0,1.846-1.031,3.434-2.538,4.271v9.864
 c0,3.774-2.37,6.998-5.696,8.283c-0.753,1.739-2.482,2.958-4.498,2.958H78.693c-1.77,0-3.3-0.949-4.159-2.355h-1.662
 c-1.305,0.797-2.781,1.385-4.414,1.744c-1.871,0.412-4.441,0.611-7.858,0.611H44.613c-1.768,0-3.29-0.95-4.146-2.355h-3.137
 c-0.898,0.616-1.869,1.157-2.916,1.614c-2.682,1.171-5.773,1.765-9.189,1.765c-3.24,0-6.232-0.554-8.893-1.646
 c-2.906-1.194-5.292-3.029-7.089-5.455c-1.773-2.392-2.845-5.052-3.188-7.906C5.79,67.657,5.66,64.019,5.66,58.758v-8.339
 c0-5.131,0.123-8.714,0.377-10.954c0.325-2.873,1.355-5.531,3.063-7.899c0.168-0.234,0.369-0.438,0.549-0.661
 c0.972-1.668,2.466-2.997,4.264-3.747c0.672-0.406,1.378-0.776,2.125-1.103c2.679-1.171,5.771-1.765,9.188-1.765
 c3.238,0,6.229,0.554,8.892,1.646c0.396,0.163,0.771,0.351,1.148,0.538h6.215c0.847-0.717,1.933-1.16,3.133-1.16h9.483
 c6.69,0,11.028,0.318,13.653,1.001c0.177,0.046,0.335,0.109,0.508,0.159h7.277c0.851-0.723,1.952-1.16,3.158-1.16h21.465
 c2.708,0,4.904,2.195,4.904,4.904V39.972z"
      />
      <g>
        <path
          :fill="color"
          d="M39.887,58.758c0,4.897-0.116,8.364-0.347,10.401s-0.953,3.898-2.167,5.584s-2.855,2.98-4.922,3.884
  c-2.067,0.903-4.476,1.354-7.225,1.354c-2.609,0-4.953-0.426-7.03-1.279s-3.748-2.132-5.013-3.838
  c-1.264-1.706-2.017-3.563-2.258-5.57c-0.241-2.006-0.361-5.519-0.361-10.537v-8.339c0-4.897,0.115-8.364,0.346-10.401
  c0.23-2.037,0.953-3.899,2.168-5.585c1.214-1.686,2.854-2.98,4.922-3.883c2.067-0.903,4.476-1.355,7.226-1.355
  c2.609,0,4.952,0.427,7.03,1.279c2.077,0.854,3.748,2.133,5.012,3.839c1.265,1.706,2.017,3.563,2.258,5.569
  c0.241,2.007,0.361,5.52,0.361,10.537V58.758z M27.212,42.742c0-2.268-0.125-3.718-0.376-4.35s-0.768-0.948-1.55-0.948
  c-0.662,0-1.169,0.256-1.52,0.768c-0.352,0.512-0.527,2.022-0.527,4.531v22.76c0,2.83,0.115,4.576,0.346,5.238
  c0.23,0.662,0.768,0.993,1.61,0.993c0.863,0,1.415-0.381,1.656-1.144c0.241-0.763,0.361-2.579,0.361-5.449V42.742z"
        />
        <path
          :fill="color"
          d="M44.613,30.218h9.483c6.121,0,10.261,0.282,12.418,0.843c2.157,0.562,3.798,1.485,4.922,2.77
  c1.124,1.285,1.826,2.715,2.107,4.29c0.281,1.576,0.421,4.672,0.421,9.288v17.07c0,4.376-0.206,7.301-0.617,8.776
  c-0.412,1.475-1.129,2.629-2.152,3.462c-1.024,0.833-2.288,1.415-3.793,1.746c-1.505,0.331-3.773,0.497-6.804,0.497H44.613V30.218z
   M57.288,38.557V70.62c1.826,0,2.951-0.366,3.372-1.099c0.421-0.732,0.632-2.725,0.632-5.976V44.608
  c0-2.208-0.071-3.623-0.211-4.245c-0.141-0.622-0.462-1.079-0.963-1.37C59.616,38.703,58.673,38.557,57.288,38.557z"
        />
        <path
          :fill="color"
          d="M78.693,30.218h21.465v9.754h-8.791v9.243h7.828v9.272h-7.828v20.472H78.693V30.218z"
        />
      </g>
    </svg>

    <svg
      :id="className"
      v-if="svgType === 'pole'"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      :width="width"
      :height="height"
      viewBox="0 0 110 110"
      enable-background="new 0 0 110 110"
      xml:space="preserve"
    >
      <g>
        <circle
          fill="#FFFFFF"
          :stroke="color"
          stroke-width="14"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          cx="55"
          cy="55"
          r="44.876"
        />
      </g>
    </svg>

    <svg
      :id="className"
      v-if="svgType === 'station'"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      :width="width"
      :height="height"
      viewBox="0 0 110 110"
      enable-background="new 0 0 110 110"
      xml:space="preserve"
    >
      <polygon
        fill="#FFFFFF"
        points="32.532,98.858 8.651,57.495 32.532,16.132 80.294,16.132 104.175,57.495 80.294,98.858 "
      />
      <g>
        <path
          :fill="color"
          d="M75.508,30.727v25.93l19.078,0.008l12.57,0.867L82.706,98.821l-48.682,0.024L10.331,56.119l9.022-6.271
  h23.011V30.727H75.508z M57.201,44.325h-5.19v6.671h5.19V44.325z M66.095,44.325h-5.19v6.671h5.19V44.325z M57.201,62.487h-5.19
  v6.669h5.19V62.487z M66.095,62.487h-5.19v6.669h5.19V62.487z M57.201,80.647h-5.19v6.671h5.19V80.647z M66.095,80.647h-5.19v6.671
  h5.19V80.647z M33.227,59.533h-5.191v6.673h5.191V59.533z M33.227,72.47h-5.191v6.672h5.191V72.47z M87.518,68.012h-5.19v6.671
  h5.19V68.012z"
        />
        <path
          :fill="color"
          d="M79.974,103.833h-47.42c-1.965,0-3.781-1.048-4.763-2.75L4.081,60.016c-0.982-1.702-0.982-3.798,0-5.5
  l23.71-41.067c0.982-1.702,2.798-2.75,4.763-2.75h47.42c1.965,0,3.781,1.048,4.763,2.75l23.708,41.067
  c0.982,1.702,0.982,3.798,0,5.5l-23.708,41.067C83.755,102.785,81.939,103.833,79.974,103.833z M35.729,92.833h41.069
  l20.533-35.567L76.798,21.699H35.729L15.195,57.266L35.729,92.833z"
        />
      </g>
    </svg>

    <svg
      :id="className"
      v-if="svgType === 'support'"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      :width="width"
      :height="height"
      viewBox="0 0 110 110"
      enable-background="new 0 0 110 110"
      xml:space="preserve"
    >
      <g>
        <polygon
          fill="#FFFFFF"
          :stroke="color"
          stroke-width="14.83"
          stroke-miterlimit="10"
          points="16.973,87.933 55,22.067
  93.027,87.933  "
        />
      </g>
    </svg>

    <svg
      :id="className"
      v-if="svgType === 'switchY'"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      :width="width"
      :height="height"
      viewBox="0 0 110 110"
      enable-background="new 0 0 110 110"
      xml:space="preserve"
    >
      <g>
        <rect
          x="5.093"
          y="23.118"
          fill="#FFFFFF"
          :stroke="color"
          stroke-width="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          width="99.813"
          height="65.452"
        />

        <line
          fill="none"
          :stroke="color"
          stroke-width="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          x1="9.184"
          y1="27.209"
          x2="99.998"
          y2="83.661"
        />

        <line
          fill="none"
          :stroke="color"
          stroke-width="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          x1="103.27"
          y1="23.118"
          x2="5.093"
          y2="88.57"
        />
      </g>
    </svg>

    <svg
      :id="className"
      v-if="svgType === 'opticalSplitter'"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      :width="width"
      :height="height"
      viewBox="0 0 110 110"
      enable-background="new 0 0 110 110"
      xml:space="preserve"
    >
      <path
        fill="#FFFFFF"
        :stroke="color"
        stroke-width="12"
        stroke-miterlimit="10"
        d="M90.046,73.613
 c-2.607,5.946-9.54,10.767-15.486,10.767H15.57c-5.944,0-8.651-4.82-6.045-10.767l12.537-28.602
 c2.607-5.947,9.54-10.767,15.485-10.767h58.989c5.945,0,8.652,4.82,6.046,10.767L90.046,73.613z"
      />
    </svg>
    <!-- tb2-09.svg -->
    <svg
      :id="className"
      v-if="svgType === 'well'"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      :width="width"
      :height="height"
      viewBox="0 0 110 110"
      enable-background="new 0 0 110 110"
      xml:space="preserve"
    >
      <g>
        <path
          fill="#FFFFFF"
          :stroke="color"
          stroke-width="11"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          d="
  M103.561,89.226c0,7.828-6.345,14.174-14.173,14.174h-67.95c-7.828,0-14.173-6.346-14.173-14.174V21.275
  c0-7.828,6.345-14.174,14.173-14.174h67.95c7.828,0,14.173,6.346,14.173,14.174V89.226z"
        />
        <g>
          <g>
            <g>
              <line
                fill="#FFFFFF"
                :stroke="color"
                stroke-width="8"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                x1="69.401"
                y1="16.438"
                x2="69.401"
                y2="94.062"
              />

              <line
                fill="#FFFFFF"
                :stroke="color"
                stroke-width="8"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                x1="41.423"
                y1="16.438"
                x2="41.423"
                y2="94.062"
              />
            </g>
          </g>
          <g>
            <g>
              <line
                fill="#FFFFFF"
                :stroke="color"
                stroke-width="8"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                x1="93.83"
                y1="69.238"
                x2="16.994"
                y2="69.238"
              />

              <line
                fill="#FFFFFF"
                :stroke="color"
                stroke-width="8"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                x1="93.83"
                y1="41.262"
                x2="16.994"
                y2="41.262"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>

    <svg
      v-if="svgType==='cran'"
      version="1.1"
      id="图层_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 50 54"
      style="enable-background:new 0 0 50 54;"
      xml:space="preserve"
    >
      <rect x="13.4" y="0.1" class="st0" width="23.6" height="54" />
      <rect x="0.2" y="17.8" class="st0" width="50" height="18.9" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'IconsFile',
  props: {
    width: {
      default: '15px',
      type: String
    },
    height: {
      default: '15px',
      type: String
    },
    svgType: String,
    color: {
      default: 'black',
      type: String
    }
  },
  data () {
    return {
      className: ''
    }
  },
  watch: {
    color: function () {
      this.$nextTick(function () {
        let b = new XMLSerializer().serializeToString(document.getElementById(this.className))
        this.$emit('returnData', btoa(unescape(encodeURIComponent((b)))))
      })
    }
  },
  mounted () {
    this.className = 'icon-' + Math.random().toString().slice(-13)
  }
}
</script>

var mapStyle = {
  styleJson: [
    {
      'featureType': 'poilabel',
      'elementType': 'labels.text.fill',
      'stylers': {
        'color': '#999999b0',
        'weight': '0.2',
        'visibility': 'on'
      }
    },
    {
      'featureType': 'poilabel',
      'elementType': 'labels.icon',
      'stylers': {
        'visibility': 'off'
      }
    },
    {
      'featureType': 'subway',
      'elementType': 'labels.icon',
      'stylers': {
        'visibility': 'off'
      }
    },
    {
      'featureType': 'subway',
      'elementType': 'labels.text.fill',
      'stylers': {
        'color': '#999999d6'
      }
    },
    {
      'featureType': 'subway',
      'elementType': 'geometry.fill',
      'stylers': {
        'color': '#999999ff'
      }
    },
    {
      'featureType': 'highway',
      'elementType': 'geometry',
      'stylers': {
        'visibility': 'on'
      }
    }
  ]
}

export default {
  mapStyle
}

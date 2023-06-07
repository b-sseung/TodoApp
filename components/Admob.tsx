import {AppOpenAd, TestIds, AdEventType} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.APP_OPEN
  : 'ca-app-pub-8631957304793435/8382042300';

export const loadAdmob = () => {
  const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });

  // Preload an app open ad
  appOpenAd.load();

  //광고가 로드되면 보이기 리스너
  appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
    appOpenAd.show();
  });
};

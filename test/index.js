
// all the fixtue data is from https://dev.twitter.com/docs/entities

var reparse = require('..');
var fs = require('fs');
var path = require('path');
var assert = require('assert');

describe('reparse()', function() {
  describe('parse URL', function() {
    var tweet;

    before(function() {
      tweet = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/urls.json')));
    });

    it('should parse URL', function() {
      assert.equal(reparse(tweet), 'Today, Twitter is updating embedded Tweets to enable a richer photo experience: <a href="https://blog.twitter.com/2013/rich-photo-experience-now-in-embedded-tweets-3">https://t.co/XdXRudPXH5</a>');
    });
    
    it('should parse URL, explicitly specified', function() {
      assert.equal(reparse(tweet, ['urls']), 'Today, Twitter is updating embedded Tweets to enable a richer photo experience: <a href="https://blog.twitter.com/2013/rich-photo-experience-now-in-embedded-tweets-3">https://t.co/XdXRudPXH5</a>');
    });
    
    it('should not parse URL, out of scope', function() {
      assert.equal(reparse(tweet, ['user_mentions']), 'Today, Twitter is updating embedded Tweets to enable a richer photo experience: https://t.co/XdXRudPXH5');
    });    
  });

  describe('parse user mention', function() {
    var tweet;

    before(function() {
      tweet = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/user_mentions.json')));
    });

    it('should parse user mention', function() {
      assert.equal(reparse(tweet), 'We\u2019re excited to work closely with the external technical community and continue <a href="https://twitter.com/TwitterEng">@TwitterEng</a>\u2019s work with open source. cc <a href="https://twitter.com/TwitterOSS">@TwitterOSS</a>');
    });

    it('should parse user mention, explicitly specified', function() {
      assert.equal(reparse(tweet), 'We\u2019re excited to work closely with the external technical community and continue <a href="https://twitter.com/TwitterEng">@TwitterEng</a>\u2019s work with open source. cc <a href="https://twitter.com/TwitterOSS">@TwitterOSS</a>');
    });

    it('should parse user mention, out of scope', function() {
      assert.equal(reparse(tweet, ['urls']), 'We\u2019re excited to work closely with the external technical community and continue @twittereng\u2019s work with open source. cc @TwitterOSS');
    });
  });

  describe('parse hashtag', function() {
    var tweet;

    before(function() {
      tweet = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/hashtags.json')));
    });

    it('should parse hashtag', function() {
      assert.equal(reparse(tweet), 'Loved <a href="https://twitter.com/search?q=%23devnestSF&src=hash">#devnestSF</a>');
    });

    it('should parse hashtag, explicitly specified', function() {
      assert.equal(reparse(tweet, ['hashtags']), 'Loved <a href="https://twitter.com/search?q=%23devnestSF&src=hash">#devnestSF</a>');
    });

    it('should parse hashtag, out of scope', function() {
      assert.equal(reparse(tweet, ['urls']), 'Loved #devnestSF');
    });
  });
});

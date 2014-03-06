# tweet-reparse

tweet-reparse attaches HTML tags to a given tweet fetched from Twitter API. Please note that it does _not_ automatically detect URL, @mention or hashtag, but just makes use of `entities` information in [Twitter API response](https://dev.twitter.com/docs/entities).

## Installation

```
$ npm install tweet-reparse
```

## Usage

```javascript
var reparse = require('tweet-reparse');
var fs = require('fs');

var tweet = JSON.parse(fs.readFileSync('JSON_tweet_data_normally_fetched_from_API'));

// by default `urls`, `hashtags` and `user_mentions` are marked up
var parseAllEntities = reparse(tweet);

// you can optionally limit the type of entities
var parseOnlyUrl = reparse(tweet, ['urls']);
```

## Outputs

### URL (urls)

```
<a href="http://hitsujiwool.net">hitsujiwool.net</a>
```

### User Mention (user_mentions)

```
<a href="https://twitter.com/hitsujiwool">@hitsujiwool</a>
```

### Hashtag (hashtags)

```
<a href="https://twitter.com/search?q=%23sheep">#sheep</a>
```

## License

MIT

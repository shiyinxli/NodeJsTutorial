## Key Differences Summary:
|Path Segment|	Behavior|	Example 1|Example 2|
|--|--|--|--|
|`/users`|	Starts path	|`/users`	|`/users`|
|`../system`	|Goes up then into system	|`/system`	|`/system`|
|`/logs`	|Resets path (absolute)	|`/logs`	|`-`|
|`logs`|	Continues path (relative)	|`-	`|`+ /logs`|
|`file.txt`|	Adds filename|	`/logs/file.txt`	|`/system/logs/file.txt`|

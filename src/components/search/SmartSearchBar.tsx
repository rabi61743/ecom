import { useState } from "react";
import { Search, X, TrendingUp, Clock, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'product' | 'category' | 'brand';
  popularity?: number;
}

interface SmartSearchBarProps {
  onSearch?: (query: string) => void;
  onSuggestionClick?: (suggestion: SearchSuggestion) => void;
  placeholder?: string;
  className?: string;
}

export default function SmartSearchBar({
  onSearch = () => {},
  onSuggestionClick = () => {},
  placeholder = "Search for products, brands and more...",
  className = ""
}: SmartSearchBarProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches] = useState<string[]>([
    "wireless headphones",
    "running shoes", 
    "coffee maker"
  ]);

  // Mock suggestions - in real app, this would come from API
  const suggestions: SearchSuggestion[] = [
    { id: "1", text: "wireless bluetooth headphones", type: "product", popularity: 95 },
    { id: "2", text: "headphones", type: "category", popularity: 88 },
    { id: "3", text: "sony headphones", type: "brand", popularity: 82 },
    { id: "4", text: "noise cancelling headphones", type: "product", popularity: 76 },
    { id: "5", text: "gaming headphones", type: "product", popularity: 71 },
  ];

  const trendingSearches = [
    "smart watch", "yoga mat", "coffee beans", "winter jacket", "desk lamp"
  ];

  const filteredSuggestions = query.length > 0 
    ? suggestions.filter(s => 
        s.text.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setQuery(searchQuery.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    onSuggestionClick(suggestion);
    setShowSuggestions(false);
  };

  const getSuggestionIcon = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'product':
        return <Search className="h-4 w-4 text-muted-foreground" />;
      case 'category':
        return <TrendingUp className="h-4 w-4 text-blue-500" />;
      case 'brand':
        return <Star className="h-4 w-4 text-yellow-500" />;
      default:
        return <Search className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className={`relative ${className}`}>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(query);
        }}
        className="relative"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            className="pl-10 pr-12 h-12 text-base"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-12 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              onClick={() => {
                setQuery("");
                setShowSuggestions(false);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button 
            type="submit"
            size="sm" 
            className="absolute right-1 top-1 h-10"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </form>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10"
            onClick={() => setShowSuggestions(false)}
          />
          
          {/* Suggestions Panel */}
          <Card className="absolute top-full left-0 right-0 mt-1 z-20 max-h-96 overflow-y-auto">
            <CardContent className="p-0">
              {/* Search Suggestions */}
              {filteredSuggestions.length > 0 && (
                <div className="p-2">
                  <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
                    Suggestions
                  </div>
                  {filteredSuggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-md text-left"
                    >
                      {getSuggestionIcon(suggestion.type)}
                      <span className="flex-1">{suggestion.text}</span>
                      <Badge variant="secondary" className="text-xs">
                        {suggestion.type}
                      </Badge>
                    </button>
                  ))}
                </div>
              )}

              {/* Recent Searches */}
              {query.length === 0 && recentSearches.length > 0 && (
                <div className="p-2 border-t">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-2 px-2">
                    <Clock className="h-3 w-3" />
                    Recent Searches
                  </div>
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(search)}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-md text-left"
                    >
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="flex-1">{search}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Trending Searches */}
              {query.length === 0 && (
                <div className="p-2 border-t">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-2 px-2">
                    <TrendingUp className="h-3 w-3" />
                    Trending
                  </div>
                  <div className="flex flex-wrap gap-1 px-2">
                    {trendingSearches.map((trend, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        onClick={() => handleSearch(trend)}
                      >
                        {trend}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* No results */}
              {query.length > 0 && filteredSuggestions.length === 0 && (
                <div className="p-4 text-center text-muted-foreground">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No suggestions found for "{query}"</p>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => handleSearch(query)}
                    className="mt-2"
                  >
                    Search anyway
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
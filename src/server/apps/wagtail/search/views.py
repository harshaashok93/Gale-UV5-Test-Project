from django.http import JsonResponse
from .client import LiveCleanSearchClient

LIVE_CLEAN_SEARCH_CLIENT = dict()


def get_product_suggestion(request):
    """Returns product suggestions with product name, headline and slug."""
    if 'instance' in LIVE_CLEAN_SEARCH_CLIENT:
        # Instantiating UnchainedSearchClient makes these calls slower
        # So store the instance and re-use
        live_clean_search_client = LIVE_CLEAN_SEARCH_CLIENT['instance']
    else:
        live_clean_search_client = LiveCleanSearchClient()
        LIVE_CLEAN_SEARCH_CLIENT['instance'] = live_clean_search_client
    query = request.GET.get('query')
    suggestions = live_clean_search_client.get_product_suggestion(query)
    suggestions_list = list()
    for suggestion in suggestions:
        suggestions_dict = dict()
        suggestions_dict['name'] = suggestion.split("||")[0]
        suggestions_dict['slug'] = suggestion.split("||")[1]
        # 0th element is the product name
        # 1st element is the product slug
        suggestions_list.append(suggestions_dict)
    return JsonResponse(suggestions_list, safe=False)

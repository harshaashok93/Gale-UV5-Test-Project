
from django.core.management import BaseCommand, call_command

from apps.wagtail.search.client import LiveCleanSearchClient


class Command(BaseCommand):

    help = "Rebuilds all the indices"

    def handle(self, **options):
        # Delete all the indices

        live_clean_search_client = LiveCleanSearchClient()
        call_command('rebuild_unchained_index')

        self.stdout.write("Rebuilding product indices for live clean...")
        live_clean_search_client.rebuild_product_index()
